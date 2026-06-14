"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://server-amanah-savings.onrender.com";

export const useSocket = (userId, role = "user") => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      // Join user-specific room
      socket.emit("join", userId);
      // Join admin room if admin
      if (role === "admin") {
        socket.emit("join_admin");
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    // Listen for notifications
    socket.on("notification", (notification) => {
      console.log("New notification:", notification);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Admin notifications
    socket.on("admin_notification", (notification) => {
      console.log("Admin notification:", notification);
      setNotifications((prev) => [notification, ...prev]);
    });

    // New ticket alert (for admins)
    socket.on("new_ticket", (ticket) => {
      console.log("New ticket:", ticket);
      setNotifications((prev) => [
        {
          type: "ticket",
          title: "New Support Ticket",
          message: ticket.subject || "A new ticket has been submitted",
          createdAt: new Date(),
        },
        ...prev,
      ]);
    });

    // Ticket reply
    socket.on("ticket_reply", ({ ticketId, reply }) => {
      console.log("Ticket reply:", ticketId, reply);
      setNotifications((prev) => [
        {
          type: "ticket_reply",
          title: "New Reply",
          message: reply.message,
          createdAt: new Date(),
        },
        ...prev,
      ]);
    });

    // Messages
    socket.on("new_message", (message) => {
      console.log("New message:", message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message_sent", (message) => {
      console.log("Message sent:", message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message_read", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, read: true } : msg))
      );
    });

    // Typing indicator
    socket.on("typing", ({ senderName }) => {
      setTypingUser(senderName);
      setTimeout(() => setTypingUser(null), 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, role]);

  // Send message
  const sendMessage = useCallback((receiverId, message, senderRole = "user") => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit("send_message", {
      senderId: userId,
      receiverId,
      message,
      senderRole,
    });
  }, [userId]);

  // Mark message as read
  const markMessageRead = useCallback((messageId) => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit("mark_read", { messageId, userId });
  }, [userId]);

  // Send typing indicator
  const sendTyping = useCallback((receiverId, senderName) => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit("typing", { receiverId, senderName });
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    notifications,
    unreadCount,
    setUnreadCount,
    messages,
    typingUser,
    sendMessage,
    markMessageRead,
    sendTyping,
  };
};

export default useSocket;
