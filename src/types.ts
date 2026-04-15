export type OS = 'Android' | 'iOS';

export interface VirtualMachine {
  id: string;
  name: string;
  os: OS;
  version: string;
  model: string;
  cpuCores: number;
  fps: number;
  ram: number; // in GB
  status: 'stopped' | 'running' | 'paused';
  batteryOptimization: boolean;
  compatibilityMode: boolean;
  fluencyMaster: boolean;
}

export type ViewState = 'auth' | 'dashboard' | 'create-vm' | 'presets' | 'cpu-config' | 'emulation';
