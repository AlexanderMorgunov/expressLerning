// Декораторы

function Component(id: number): Function {
	console.log('init Component');
	return (target: Function) => {
		console.log('run Component');
		target.prototype.id = id;
	};
}

function Logger(): Function {
	console.log('init logger');
	return (target: Function) => {
		console.log('run logger');
	};
}

function Method(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
	console.log('init method');
	console.log(propertyKey);
	// const oldValue = descriptor.value;
	descriptor.value = function (...args: any[]): number {
		return args[0] * 10;
	};
}

function Prop(target: Object, propertyKey: string): void {
	console.log('init prop');
	let value: number;
	const getter = (): number => {
		console.log('get');
		return value;
	};
	const setter = (newVal: number): void => {
		console.log('set');
		value = newVal;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

function Param(target: Object, propertyKey: string, index: number): void {
	console.log(propertyKey, index);
}

@Logger()
@Component(1)
export class User {
	@Prop id: number;

	@Method
	updateId(@Param newId: number): void {
		this.id = newId;
	}
}

console.log(new User().id);
console.log(new User().updateId(2));
