import {Item} from 'types/types';

export interface User extends Item {
    first_name: string;
    last_name: string;
    email: string;
}
