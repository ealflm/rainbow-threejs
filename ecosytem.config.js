const argEnvIndex = process.argv.indexOf("--env");
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || "";

const RUN_ENV_MAP = {
  local: {
    instances: 2,
    max_memory_restart: "250M",
  },
  dev: {
    instances: 2,
    max_memory_restart: "250M",
  },
  prod: {
    instances: 4,
    max_memory_restart: "1000M",
  },
};

if (!(argEnv in RUN_ENV_MAP)) {
  argEnv = "prod";
}

module.exports = {
  apps: [
    {
      name: "THREEJS-RAINBOW",
      script: "npm",
      args: "start",
      interpreter: "/home/ealflm/.nvm/versions/node/v14.21.3/bin/npm",
      instances: RUN_ENV_MAP[argEnv].instances,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
      env_local: {
        APP_ENV: "local",
      },
      env_dev: {
        APP_ENV: "dev",
      },
      env_prod: {
        APP_ENV: "prod",
      },
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "14.225.217.51",
      key: "deploy.key",
      ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/main",
      repo: "https://github.com/ealflm/rainbow-threejs",
      path: "/root/app/threejs-rainbow",
      "post-deploy": "npm run deploy:prod",
      env: {
        NODE_ENV: "production",
        DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
      },
    },
  },
};
