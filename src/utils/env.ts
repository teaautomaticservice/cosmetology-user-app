declare global {
  interface Window {
    env: any
  }
}

type EnvType = {
  REACT_APP_API_URL: string;
}

export const env: EnvType = { ...process.env, ...window.env }