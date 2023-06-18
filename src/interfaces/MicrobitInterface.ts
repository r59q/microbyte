import { PairingPattern } from "../utils/PairingPattern";
import { IsService } from "./ServiceInterface";

export interface isMicrobit {
	getService<T extends IsService>(): T;

	requestBluetooth(name?: string | PairingPattern): Promise<void>;

	getBluetoothDevice(): BluetoothDevice | undefined;
}
