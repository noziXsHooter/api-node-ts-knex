import os from 'os';

export class NetworkUtils {
    private networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]> = os.networkInterfaces();
    private ipv4Interfaces: os.NetworkInterfaceInfo[] = Object.values(this.networkInterfaces)
        .flat()
        .filter((iface: os.NetworkInterfaceInfo | undefined): iface is os.NetworkInterfaceInfo => {
            return iface !== undefined && iface.family === 'IPv4' && !iface.internal;
        });
    private localIPAddress: string = this.ipv4Interfaces.length > 0 ? this.ipv4Interfaces[0].address : 'Não encontrado';

    identity<T>(arg: T): T {
        return arg;
    }

    getLocalIPAddress(): string {
        return this.localIPAddress;
    }
}