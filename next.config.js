module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  env: {
    BACKEND_API: process.env.BACKEND_API,
  },
}
