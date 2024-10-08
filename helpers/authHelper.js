import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("passward is hashed");
        return hashedPassword
    } catch (error) {
        console.log("Error in hashing password", error);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    console.log("passward is compared");
    return bcrypt.compare(password, hashedPassword);
}