import bcrypt from 'bcrypt';
const saltRounds = 10;

async function EncodedPassowrd(params: string): Promise<string> {
   try {
     const data =  await  bcrypt.hash(params, saltRounds);
     return data;
   } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
   }
}

async function CompareEncode(text: string, encodedText: string): Promise<boolean>{
    try {
        const data = await bcrypt.compare(text, encodedText);
        return data;
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`)
    }
}

export {CompareEncode, EncodedPassowrd};