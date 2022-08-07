import { Argument, Command } from 'commander';
export { Argument } from 'commander';
export declare class Program {
    static parseAsync(args: any): Promise<Command>;
    static parse(args: any): Command;
}
export declare function programCommand(name: string, requireKeyPair?: boolean): any;
export declare function programCommandWithArgs(name: string, args: Array<Argument>, action: (...args: any[]) => Promise<any>, requireKeyPair?: boolean): any;
export declare function programCommandWithConfig(name: string, action: (...args: any[]) => Promise<any>, requireKeyPair?: boolean): any;
export declare function programCommandWithArgsAndConfig(name: string, args: Array<Argument>, action: (...args: any[]) => Promise<any>, requireKeyPair?: boolean): any;
export declare function readConfig(configFile: string): {};
//# sourceMappingURL=index.d.ts.map