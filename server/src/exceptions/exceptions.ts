/** src/errors/BadRequestError **/

export type CustomErrorContent = {
    message: string;
};
export class BadRequestError extends Error {
  constructor(data: CustomErrorContent){
    super(data.message)
    Object.setPrototypeOf(this, BadRequestError.prototype); 
  }
}  
 