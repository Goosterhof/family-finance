import {Item} from 'types/types';

export interface User extends Item {
    firstName: string;
    lastName: string;
    email: string;
}
