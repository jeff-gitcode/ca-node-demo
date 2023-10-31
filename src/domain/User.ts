import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field()
    id!: number;

    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    token?: string;

    constructor(id: number, name: string, email: string, password?: string, token?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}