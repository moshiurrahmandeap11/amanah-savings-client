/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
