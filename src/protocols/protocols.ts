export type User = {
    id: number;
    account_name: string;
    password: string;
    diamonds: number;
    peanuts: number;
    nickname: string;
}

export type newUser = Omit<User, "id" | "diamonds" | "peanuts">;
