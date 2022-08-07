var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import { Program } from "@raindrop-studios/sol-kit";
import * as NamespaceInstruction from "../instructions/namespace";
import { NAMESPACE_ID } from "../constants/programIds";
import { PREFIX } from "../constants/namespace";
import { Namespace } from "../state/namespace";
import { getNamespacePDA } from "../utils/pda";
export class NamespaceProgram extends Program.Program {
    constructor() {
        super();
        this.PROGRAM_ID = NAMESPACE_ID;
        this.instruction = new NamespaceInstruction.Instruction({ program: this });
    }
    initializeNamespace(args, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = yield this.instruction.initializeNamespace(args, accounts);
            yield this.sendWithRetry(instruction, []);
        });
    }
    fetchNamespace(mint) {
        return __awaiter(this, void 0, void 0, function* () {
            let namespacePDA = (yield getNamespacePDA(mint))[0];
            const namespaceObj = yield this.client.account.namespace.fetch(namespacePDA);
            return new Namespace(namespacePDA, namespaceObj);
        });
    }
    ;
    updateNamespace(args, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = yield this.instruction.updateNamespace(args, accounts);
            yield this.sendWithRetry(instruction, []);
        });
    }
}
NamespaceProgram.PREFIX = PREFIX;
;
