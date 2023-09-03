export function getEnvVar(name:string):string {
    const envValue = process.env[name];
    if (typeof envValue !== 'string') {
        throw new Error(`Environment variable ${name} is not defined.`)
    }
    return envValue
}