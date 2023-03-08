import {
  Environments,
  getEnsEnvironmentConfig,
} from "@fairdatasociety/fdp-contracts";

function getEnvironment() {
  const environment = process.env.REACT_APP_ENVIRONMENT;

  if (environment === "LOCALHOST") {
    return getEnsEnvironmentConfig(Environments.LOCALHOST);
  } else if (environment === "GOERLI") {
    return getEnsEnvironmentConfig(Environments.GOERLI);
  }

  return undefined;
}

export function getEnsConfig(): any {
  let ensOptions: any = getEnvironment();
  const ensRegistry = process.env.REACT_APP_ENS_REGISTRY_ADDRESS;
  const publicResolver = process.env.REACT_APP_PUBLIC_RESOLVER_ADDRESS;
  const fdsRegistrar = process.env.REACT_APP_SUBDOMAIN_REGISTRAR_ADDRESS;
  const rpcUrl = process.env.REACT_APP_RPC_URL;
  const ensDomain = "fds";

  if (!rpcUrl && !ensRegistry && !publicResolver && !fdsRegistrar) {
    return ensOptions
      ? {
          ensOptions,
          ensDomain,
        }
      : undefined;
  }

  ensOptions = ensOptions || {};

  if (rpcUrl) {
    ensOptions.rpcUrl = rpcUrl;
  }

  if (ensRegistry && publicResolver && fdsRegistrar) {
    ensOptions.contractAddresses = {
      ensRegistry,
      publicResolver,
      fdsRegistrar,
    };
  }

  return {
    ensOptions: {
      performChecks: true,
      ...ensOptions,
    },
    ensDomain,
  };
}

export function isPasswordValid(password: string): boolean {
  // TODO check if password contains lowercase and uppercase letters
  return typeof password === "string" && password.length >= 12;
}
