import { MicrobitHandler } from "../interfaces/MicrobitHandler";
import MBSpecs from "./MBSpecs";
import { MicrobitDevice, MicrobitDeviceState } from "./MicrobitDevice";
import USBController from "./USBController";

export class Microbit {

	private device: MicrobitDevice | undefined = undefined;
	private handler: MicrobitHandler | undefined = undefined;
	private usbController: USBController | undefined = undefined;

	constructor() {
	}

	public setDevice(device: MicrobitDevice) {
		this.device = device;
	}

	public getId(): string | undefined {
		return this.device?.getId();
	}

	public connect() {
		if (!this.device) {
			throw new Error("Device not set");
		}
		if ([MicrobitDeviceState.DISCONNECTED, MicrobitDeviceState.CLOSED].includes(this.device.getState())) {
			this.device.connect();
		}
	}

	public setHandler(handler: MicrobitHandler) {
		this.handler = handler;
		if (this.device) {
			this.device.setHandler(this.handler);
		}
	}

	public getHandler(): MicrobitHandler | undefined {
		return this.handler;
	}

	public async sendMessage(message: string): Promise<void> {
		if (this.device) {
			await this.device.sendMessage(message);
		} else {
			console.warn("Cannot send message, there's no device attached!");
		}
	}

	public disconnect() {
		if (this.device) {
			this.device.setAutoReconnect(false);
			this.device.disconnect();
		}
	}

	public setAutoReconnect(shouldReconnectAutomatically: boolean): void {
		if (this.device) {
			this.device?.setAutoReconnect(shouldReconnectAutomatically);
		}
	}

	public isAutoReconnectEnabled(): boolean {
		return this.device?.isAutoReconnectEnabled() ?? false;
	}

	public getDeviceState(): MicrobitDeviceState {
		if (this.device) {
			return this.device.getState();
		}
		return MicrobitDeviceState.CLOSED;
	}

	public async setLEDMatrix(matrix: boolean[][]): Promise<void> {
		if (this.device) {
			await this.device.setLEDMatrix(matrix);
		}
	}

	public async setIOPin(pin: MBSpecs.UsableIOPin, on: boolean): Promise<void> {
		if (this.device) {
			await this.device.setIOPin(pin, on);
		}
	}

	public getUsbController() {
		if (!this.usbController) {
			this.usbController = new USBController();
		}
		return this.usbController;
	}

	public getLastVersion() {
		if (this.device) {
			return this.device.getLastVersion();
		}
		return undefined;
	}

	public getLastName() {
		if (this.device) {
			return this.device.getLastName();
		}
		return undefined;
	}

	public getDevice(): MicrobitDevice | undefined {
		return this.device;
	}
}