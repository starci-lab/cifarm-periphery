import { NodeEnv, envConfig } from "@/config"

export const getEnvValue = <ValueType = string>(values: {
  development?: ValueType;
  production?: ValueType;
}): ValueType => {
    const { development, production } = values
    switch (envConfig().nodeEnv) {
    case NodeEnv.Production:
        return production
    default:
        return development
    }
}
