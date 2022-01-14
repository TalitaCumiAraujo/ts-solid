import { uuid } from "uuidv4";
export class User {
    // readonly n pode ser alterado
    public readonly id: string;
    public email: string;
    public password: string;

    constructor(props: Omit<User, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }

}