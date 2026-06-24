// hooks/useSocket.js
import { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export const useSocket = (userId, userType = "user") => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    if (!userId) {
      console.log("No userId provided, skipping socket connection");
      return;
    }

    // Create socket connection
    const socketInstance = io(SOCKET_URL, {
      query: { userId, userType },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    // Connection events
    socketInstance.on("connect", () => {
      console.log(`Socket connected as ${userType}:`, socketInstance.id);
      setIsConnected(true);
      // Join user room
      socketInstance.emit("join", userId);
      if (userType === "admin") {
        socketInstance.emit("join_admin_room", { adminId: userId });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    // Receive message
    socketInstance.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => {
        const existsById = data?._id && prev.some((m) => String(m._id) === String(data._id));
        if (existsById) return prev;
        return [...prev, data];
      });
      
      // Also add to notifications if it's a ticket message
      if (data.ticketId) {
        setNotifications((prev) => [
          {
            _id: data._id || Date.now().toString(),
            type: "ticket_reply",
            title: "New Reply",
            message: data.message,
            ticketId: data.ticketId,
            userId: data.senderId,
            read: false,
            createdAt: data.createdAt || new Date(),
          },
          ...prev,
        ]);
      }
    });

    socketInstance.on("ticket_reply", (data) => {
      if (!data?.ticketId || !data?.reply) return;
      const replyNotification = {
        _id: Date.now().toString(),
        type: "ticket_reply",
        title: "New Reply",
        message: data.reply.message,
        ticketId: data.ticketId,
        read: false,
        createdAt: data.reply.createdAt || new Date(),
      };
      setNotifications((prev) => [replyNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // New ticket notification
    socketInstance.on("new_ticket", (data) => {
      console.log("New ticket:", data);
      const ticketNotification = {
        _id: data._id || Date.now().toString(),
        type: "new_ticket",
        title: "New Support Ticket",
        message: data.subject || "New ticket created",
        ticketId: data.ticketId,
        userId: data.userId,
        read: false,
        createdAt: data.createdAt || new Date(),
      };
      setNotifications((prev) => [ticketNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Notification for end-users
    socketInstance.on("notification", (data) => {
      if (!data) return;
      setNotifications((prev) => {
        const existsById = data?._id && prev.some((n) => String(n._id) === String(data._id));
        if (existsById) return prev;
        return [
          {
            ...data,
            read: typeof data.read === "boolean" ? data.read : false,
            createdAt: data.createdAt || new Date(),
          },
          ...prev,
        ];
      });
      if (!data.read) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // Notification for admins
    socketInstance.on("admin_notification", (data) => {
      if (!data) return;
      const normalized = {
        ...data,
        _id: data._id || `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        read: typeof data.read === "boolean" ? data.read : false,
        createdAt: data.createdAt || new Date(),
      };
      setNotifications((prev) => [normalized, ...prev]);
      if (!normalized.read) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // User typing
    socketInstance.on("typing", (data) => {
      if (data.userId !== userId) {
        setTypingUser(data);
        setTimeout(() => setTypingUser(null), 3000);
      }
    });

    // Online users update
    socketInstance.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    // Ticket update notification
    socketInstance.on("ticket_updated", (data) => {
      console.log("Ticket updated:", data);
      const updateNotification = {
        _id: data._id || Date.now().toString(),
        type: "ticket_updated",
        title: "Ticket Updated",
        message: data.message || `Ticket ${data.ticketId} has been updated`,
        ticketId: data.ticketId,
        userId: data.userId,
        read: false,
        createdAt: data.createdAt || new Date(),
      };
      setNotifications((prev) => [updateNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance.off();
      }
    };
  }, [userId, userType]);

  // Send message
  const sendMessage = useCallback(
    (receiverId, message, senderRole = "user", ticketId = null) => {
      if (!socketRef.current || !isConnected) {
        console.warn("Socket not connected, cannot send message");
        return;
      }

      const messageData = {
        senderId: userId,
        receiverId,
        message,
        senderRole,
        ticketId,
        timestamp: new Date(),
      };

      socketRef.current.emit("send_message", messageData);
      console.log("Message sent:", messageData);
    },
    [userId, isConnected]
  );

  // Send typing indicator
  const sendTyping = useCallback(
    (receiverId) => {
      if (!socketRef.current || !isConnected) return;
      socketRef.current.emit("typing", { receiverId, userId, userType });
    },
    [userId, isConnected]
  );

  // Join admin room (for admin users)
  const joinAdminRoom = useCallback(() => {
    if (!socketRef.current || !isConnected) {
      console.warn("Socket not connected, cannot join admin room");
      return;
    }

    socketRef.current.emit("join_admin_room", { adminId: userId });
    console.log("Admin joined admin room:", userId);
  }, [userId, isConnected]);

  // Join ticket room (for specific ticket chat)
  const joinTicketRoom = useCallback(
    (ticketId) => {
      if (!socketRef.current || !isConnected) {
        console.warn("Socket not connected, cannot join ticket room");
        return;
      }

      socketRef.current.emit("join_ticket_room", { ticketId, userId });
      console.log("Joined ticket room:", ticketId);
    },
    [userId, isConnected]
  );

  // Leave ticket room
  const leaveTicketRoom = useCallback(
    (ticketId) => {
      if (!socketRef.current || !isConnected) return;
      socketRef.current.emit("leave_ticket_room", { ticketId, userId });
    },
    [userId, isConnected]
  );

  // Mark messages as read
  const markAsRead = useCallback(
    (senderId) => {
      if (!socketRef.current || !isConnected) return;
      socketRef.current.emit("mark_read", { senderId, userId });
    },
    [userId, isConnected]
  );

  // Mark notification as read
  const markNotificationAsRead = useCallback(
    (notificationId) => {
      let didMarkUnread = false;
      setNotifications((prev) =>
        prev.map((n) => {
          if (n._id === notificationId && !n.read) {
            didMarkUnread = true;
            return { ...n, read: true };
          }
          return n;
        })
      );

      if (didMarkUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    },
    []
  );

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return {
    socket,
    isConnected,
    messages,
    notifications,
    unreadCount,
    typingUser,
    onlineUsers,
    sendMessage,
    sendTyping,
    joinAdminRoom,
    joinTicketRoom,
    leaveTicketRoom,
    markAsRead,
    markNotificationAsRead,
    clearNotifications,
  };
};

export default useSocket;