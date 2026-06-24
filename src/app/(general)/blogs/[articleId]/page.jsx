import React from "react";
import BlogDetailsPage from "../../../components/navComponents/BlogDetailsPage";

const BlogDetails = async ({ params }) => {
  const resolvedParams = await params;
  return <BlogDetailsPage articleId={resolvedParams?.articleId} />;
};

export default BlogDetails;
