import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Cpu, 
  Settings, 
  Play, 
  Plus, 
  Trash2, 
  LogOut, 
  Zap, 
  Battery, 
  ShieldCheck, 
  Activity,
  User,
  LogIn,
  Apple,
  Facebook,
  Monitor,
  ChevronRight,
  X,
  Power,
  RotateCcw,
  Home,
  Menu,
  ArrowLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VirtualMachine, ViewState, OS } from './types';

const PRESETS = [
  { name: 'Samsung S24 Ultra', os: 'Android' as OS, version: '14', model: 'SM-S928B' },
  { name: 'iPhone 15 Pro Max', os: 'iOS' as OS, version: '17', model: 'A3106' },
  { name: 'Xiaomi 14 Ultra', os: 'Android' as OS, version: '14', model: '24030PN60G' },
  { name: 'Google Pixel 8 Pro', os: 'Android' as OS, version: '14', model: 'GC3VE' },
  { name: 'iPhone 14 Pro Max', os: 'iOS' as OS, version: '16', model: 'A2894' },
];

export default function App() {
  const [view, setView] = useState<ViewState>('auth');
  const [user, setUser] = useState<{ name: string; photo?: string } | null>(null);
  const [vms, setVms] = useState<VirtualMachine[]>([]);
  const [selectedVmId, setSelectedVmId] = useState<string | null>(null);
  const [activeVmId, setActiveVmId] = useState<string | null>(null);

  // New VM Form State
  const [newVm, setNewVm] = useState<Partial<VirtualMachine>>({
    name: '',
    os: 'Android',
    version: '14',
    model: 'Generic',
    cpuCores: 4,
    fps: 60,
    ram: 8,
    batteryOptimization: true,
    compatibilityMode: true,
    fluencyMaster: true,
  });

  const handleLogin = (name: string) => {
    setUser({ name });
    setView('dashboard');
  };

  const createVm = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const vm: VirtualMachine = {
      id,
      name: newVm.name || `VM-${id}`,
      os: newVm.os as OS,
      version: newVm.version || '14',
      model: newVm.model || 'Generic',
      cpuCores: newVm.cpuCores || 4,
      fps: newVm.fps || 60,
      ram: newVm.ram || 8,
      status: 'stopped',
      batteryOptimization: newVm.batteryOptimization ?? true,
      compatibilityMode: newVm.compatibilityMode ?? true,
      fluencyMaster: newVm.fluencyMaster ?? true,
    };
    setVms([...vms, vm]);
    setView('dashboard');
  };

  const deleteVm = (id: string) => {
    setVms(vms.filter(v => v.id !== id));
    if (selectedVmId === id) setSelectedVmId(null);
  };

  const startVm = (id: string) => {
    setVms(vms.map(v => v.id === id ? { ...v, status: 'running' } : v));
    setActiveVmId(id);
    setView('emulation');
  };

  const stopVm = (id: string) => {
    setVms(vms.map(v => v.id === id ? { ...v, status: 'stopped' } : v));
    setActiveVmId(null);
    setView('dashboard');
  };

  const selectedVm = vms.find(v => v.id === selectedVmId);
  const activeVm = vms.find(v => v.id === activeVmId);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {view === 'auth' && (
          <motion.div 
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen p-4 relative"
          >
            <div className="scanline" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]" />
            
            <Card className="w-full max-w-md glass border-white/10 relative z-20">
              <CardHeader className="text-center space-y-1">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 neon-glow">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold tracking-tighter">PHANTOM DROID</CardTitle>
                <CardDescription className="text-white/50">Virtualização Mobile de Próxima Geração</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                    <LogIn className="w-4 h-4 mr-2" /> Google
                  </Button>
                  <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                    <Apple className="w-4 h-4 mr-2" /> Apple
                  </Button>
                  <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                    <Facebook className="w-4 h-4 mr-2" /> FB
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-white/40">Ou acesso local</span></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome de Perfil</Label>
                  <Input id="name" placeholder="Ex: PhantomUser" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass">Senha</Label>
                  <Input id="pass" type="password" placeholder="••••••••" className="bg-white/5 border-white/10" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-white text-black hover:bg-white/90" onClick={() => handleLogin('PhantomUser')}>
                  Criar Perfil Local
                </Button>
                <Button variant="ghost" className="w-full text-white/60 hover:text-white" onClick={() => handleLogin('Convidado')}>
                  Entrar como Convidado
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex h-screen"
          >
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col p-4">
              <div className="flex items-center gap-3 mb-8 px-2">
                <Smartphone className="w-6 h-6" />
                <span className="font-bold tracking-tight">PHANTOM DROID</span>
              </div>
              
              <nav className="flex-1 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5">
                  <Monitor className="w-4 h-4 mr-3" /> Máquinas Virtuais
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5" onClick={() => setView('cpu-config')}>
                  <Cpu className="w-4 h-4 mr-3" /> Processador Virtual
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5">
                  <Settings className="w-4 h-4 mr-3" /> Configurações
                </Button>
              </nav>

              <div className="mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-white/40">Versão 1.0.4-Stable</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setView('auth')}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
              <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20">
                <h2 className="text-lg font-semibold">Dashboard Central</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Sistema Online
                  </Badge>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    IA Ativa
                  </Badge>
                </div>
              </header>

              <ScrollArea className="flex-1 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                  {/* Action Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="glass border-white/10 hover:border-white/20 transition-all cursor-pointer group" onClick={() => setView('create-vm')}>
                      <CardHeader>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:neon-glow transition-all">
                          <Plus className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-base">Criar Celular Virtual</CardTitle>
                        <CardDescription>Configuração manual avançada</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="glass border-white/10 hover:border-white/20 transition-all cursor-pointer group" onClick={() => setView('presets')}>
                      <CardHeader>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:neon-glow transition-all">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-base">Adicionar Celular Virtual</CardTitle>
                        <CardDescription>Presets de modelos populares</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="glass border-white/10 hover:border-white/20 transition-all cursor-pointer group" onClick={() => setView('cpu-config')}>
                      <CardHeader>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:neon-glow transition-all">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-base">Criar Processador Virtual</CardTitle>
                        <CardDescription>Ajuste de performance e núcleos</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* VM List */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Suas Máquinas Virtuais</h3>
                    {vms.length === 0 ? (
                      <div className="h-48 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/20">
                        <Smartphone className="w-8 h-8 mb-2 opacity-20" />
                        <p>Nenhuma VM criada ainda.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {vms.map(vm => (
                          <motion.div 
                            key={vm.id}
                            layoutId={vm.id}
                            className={`p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${selectedVmId === vm.id ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            onClick={() => setSelectedVmId(vm.id)}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${vm.os === 'Android' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                              <Smartphone className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{vm.name}</h4>
                                <Badge variant="secondary" className="text-[10px] py-0 h-4">{vm.os} {vm.version}</Badge>
                              </div>
                              <p className="text-xs text-white/40">{vm.model} • {vm.cpuCores} Cores • {vm.ram}GB RAM</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {vm.status === 'running' && (
                                <div className="flex items-center gap-1 text-green-500 text-xs mr-4">
                                  <Activity className="w-3 h-3 animate-pulse" /> Executando
                                </div>
                              )}
                              <Button size="icon" variant="ghost" className="text-white/40 hover:text-red-500" onClick={(e) => { e.stopPropagation(); deleteVm(vm.id); }}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-white text-black hover:bg-white/90" onClick={(e) => { e.stopPropagation(); startVm(vm.id); }}>
                                <Play className="w-4 h-4 mr-2 fill-current" /> Iniciar
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* AI Status Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-yellow-500">
                          <ShieldCheck className="w-4 h-4" />
                          <CardTitle className="text-xs uppercase tracking-wider">IA Compatibilidade</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">99.8%</p>
                        <p className="text-[10px] text-white/40">Bypass de hardware ativo</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-green-500">
                          <Battery className="w-4 h-4" />
                          <CardTitle className="text-xs uppercase tracking-wider">IA Redutor Bateria</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">-85%</p>
                        <p className="text-[10px] text-white/40">Consumo em background otimizado</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-purple-500">
                          <Zap className="w-4 h-4" />
                          <CardTitle className="text-xs uppercase tracking-wider">IA Fluidez Master</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">60 FPS</p>
                        <p className="text-[10px] text-white/40">Alocação dinâmica de RAM</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </main>
          </motion.div>
        )}

        {view === 'create-vm' && (
          <motion.div 
            key="create-vm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen flex items-center justify-center p-4 bg-black"
          >
            <Card className="w-full max-w-2xl glass border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Configuração Manual</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setView('dashboard')}><X className="w-4 h-4" /></Button>
                </div>
                <CardDescription>Defina os parâmetros da sua nova máquina virtual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da VM</Label>
                    <Input 
                      placeholder="Ex: Gaming VM" 
                      className="bg-white/5 border-white/10" 
                      value={newVm.name}
                      onChange={(e) => setNewVm({...newVm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sistema Operacional</Label>
                    <Select value={newVm.os} onValueChange={(v: OS) => setNewVm({...newVm, os: v})}>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Selecione o OS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Android">Android (7 - 14)</SelectItem>
                        <SelectItem value="iOS">iOS Simulation (14 - 17)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Núcleos de CPU (Virtual Core)</Label>
                    <span className="text-xs font-mono text-white/60">{newVm.cpuCores} Cores</span>
                  </div>
                  <Slider 
                    value={[newVm.cpuCores || 4]} 
                    min={1} 
                    max={16} 
                    step={1} 
                    onValueChange={(vals) => setNewVm({...newVm, cpuCores: vals[0]})}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Memória RAM</Label>
                    <span className="text-xs font-mono text-white/60">{newVm.ram} GB</span>
                  </div>
                  <Slider 
                    value={[newVm.ram || 8]} 
                    min={2} 
                    max={32} 
                    step={2} 
                    onValueChange={(vals) => setNewVm({...newVm, ram: vals[0]})}
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-white/40">Módulos de Inteligência Artificial</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IA Super Redutor de Bateria</Label>
                      <p className="text-[10px] text-white/40">Otimiza consumo para máx 5% a cada 3h</p>
                    </div>
                    <Switch checked={newVm.batteryOptimization} onCheckedChange={(v) => setNewVm({...newVm, batteryOptimization: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IA Compatibilidade Infinita</Label>
                      <p className="text-[10px] text-white/40">Burlar verificações de hardware de apps</p>
                    </div>
                    <Switch checked={newVm.compatibilityMode} onCheckedChange={(v) => setNewVm({...newVm, compatibilityMode: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IA Fluidez Master</Label>
                      <p className="text-[10px] text-white/40">Priorizar app emulado sobre processos reais</p>
                    </div>
                    <Switch checked={newVm.fluencyMaster} onCheckedChange={(v) => setNewVm({...newVm, fluencyMaster: v})} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1 border-white/10" onClick={() => setView('dashboard')}>Cancelar</Button>
                <Button className="flex-1 bg-white text-black hover:bg-white/90" onClick={createVm}>Criar Máquina Virtual</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {view === 'presets' && (
          <motion.div 
            key="presets"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen p-8 bg-black"
          >
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Presets de Dispositivos</h2>
                  <p className="text-white/40">Escolha um modelo pré-configurado para emulação instantânea</p>
                </div>
                <Button variant="ghost" onClick={() => setView('dashboard')}><ArrowLeft className="w-4 h-4 mr-2" /> Voltar</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRESETS.map((p, i) => (
                  <Card key={i} className="glass border-white/10 hover:border-white/30 transition-all cursor-pointer group" onClick={() => {
                    setNewVm({ ...newVm, name: p.name, os: p.os, version: p.version, model: p.model });
                    setView('create-vm');
                  }}>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.os === 'Android' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{p.name}</CardTitle>
                        <CardDescription>{p.os} {p.version} • {p.model}</CardDescription>
                      </div>
                      <ChevronRight className="ml-auto w-5 h-5 text-white/20 group-hover:text-white transition-all" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'cpu-config' && (
          <motion.div 
            key="cpu-config"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen p-8 bg-black"
          >
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Processador Virtual</h2>
                  <p className="text-white/40">Ajuste fino da performance do Phantom Engine</p>
                </div>
                <Button variant="ghost" onClick={() => setView('dashboard')}><ArrowLeft className="w-4 h-4 mr-2" /> Voltar</Button>
              </div>

              <Card className="glass border-white/10">
                <CardContent className="pt-6 space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg">Taxa de Quadros (FPS)</Label>
                      <Badge variant="secondary" className="font-mono">{newVm.fps} FPS</Badge>
                    </div>
                    <Slider 
                      value={[newVm.fps || 60]} 
                      min={25} 
                      max={120} 
                      step={5} 
                      onValueChange={(vals) => setNewVm({...newVm, fps: vals[0]})}
                    />
                    <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-tighter">
                      <span>Cinematográfico (25)</span>
                      <span>Padrão (60)</span>
                      <span>Ultra (120)</span>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-4">
                    <Label className="text-lg">Alocação de Threads</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 4, 8].map(n => (
                        <Button 
                          key={n} 
                          variant={newVm.cpuCores === n ? 'default' : 'outline'} 
                          className={newVm.cpuCores === n ? 'bg-white text-black' : 'border-white/10'}
                          onClick={() => setNewVm({...newVm, cpuCores: n})}
                        >
                          {n} Cores
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-4">
                    <Zap className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-500">Otimização Dinâmica</p>
                      <p className="text-xs text-white/60">O Phantom Engine ajustará automaticamente a carga de CPU baseado na temperatura do dispositivo host.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-black hover:bg-white/90" onClick={() => setView('dashboard')}>Salvar Configurações</Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        )}

        {view === 'emulation' && activeVm && (
          <motion.div 
            key="emulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen bg-black flex flex-col"
          >
            {/* Emulation Header */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeVm.os === 'Android' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">{activeVm.name}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{activeVm.os} {activeVm.version} • {activeVm.fps} FPS</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 mr-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <Cpu className="w-3 h-3" /> {activeVm.cpuCores}C
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <Activity className="w-3 h-3" /> {activeVm.ram}GB
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-green-500">
                    <Battery className="w-3 h-3" /> 100%
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white/40 hover:text-white"><RotateCcw className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="text-red-500/60 hover:text-red-500 hover:bg-red-500/10" onClick={() => stopVm(activeVm.id)}><Power className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Virtual Screen Area */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]">
              <div className="relative aspect-[9/19] h-full max-h-[800px] rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden bg-black group">
                {/* Screen Content Simulation */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Status Bar */}
                  <div className="h-7 flex items-center justify-between px-6 pt-1">
                    <span className="text-[10px] font-bold">15:47</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-white/20 rounded-full" />
                      <div className="w-4 h-2 bg-white/40 rounded-sm" />
                    </div>
                  </div>

                  {/* App Grid Simulation */}
                  <div className="flex-1 p-6 grid grid-cols-4 gap-4 content-start">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                          {i === 0 ? <Smartphone className="w-6 h-6 text-blue-400" /> : 
                           i === 1 ? <Settings className="w-6 h-6 text-zinc-400" /> :
                           i === 2 ? <Play className="w-6 h-6 text-red-400" /> :
                           <div className="w-6 h-6 rounded-md bg-white/10" />}
                        </div>
                        <span className="text-[8px] text-white/40">App {i + 1}</span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Bar */}
                  <div className="h-12 flex items-center justify-center gap-12 pb-2">
                    <ArrowLeft className="w-4 h-4 text-white/40" />
                    <div className="w-4 h-4 rounded-full border-2 border-white/40" />
                    <Menu className="w-4 h-4 text-white/40" />
                  </div>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%] z-50 opacity-20" />
              </div>
            </div>
            
            {/* Controls Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <Button variant="outline" className="rounded-full glass border-white/10 h-12 w-12 p-0"><Home className="w-5 h-5" /></Button>
              <Button variant="outline" className="rounded-full glass border-white/10 h-12 w-12 p-0"><Settings className="w-5 h-5" /></Button>
              <Button variant="outline" className="rounded-full glass border-white/10 h-12 w-12 p-0"><Zap className="w-5 h-5" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

