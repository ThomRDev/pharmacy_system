import { Response } from "express";

export enum HttpStatus{
	OK                    = 200,
	BAD_REQUEST           = 400,
	UNAUTHORIZED          = 401,
	FORBIDDEN             = 403,
	NOT_FOUND             = 404,
	INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
	Ok(res:Response,data?:any):Response{
		return res.status(HttpStatus.OK).json({
			ok: true,
			status : HttpStatus.OK,
			statusMsg  : "success",
			data
		})
	}
	BadRequest(res:Response,data?:any):Response{
		return res.status(HttpStatus.BAD_REQUEST).json({
			ok: false,
			status : HttpStatus.BAD_REQUEST,
			statusMsg  : "Bad request",
			data
		})
	}
	NotFound(res: Response, data?: any): Response {
		return res.status(HttpStatus.NOT_FOUND).json({
			ok: false,
			status: HttpStatus.NOT_FOUND,
			statusMsg: "Not Found",
			error: data,
		});
	}

	Unauthorized(res: Response, data?: any): Response {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			ok: false,
			status: HttpStatus.UNAUTHORIZED,
			statusMsg: "Unauthorized",
			error: data,
		});
	}

	Forbidden(res: Response, data?: any): Response {
		return res.status(HttpStatus.FORBIDDEN).json({
			ok: false,
			status: HttpStatus.FORBIDDEN,
			statusMsg: "Forbidden",
			error: data,
		});
	}

	Error(res: Response, data?: any): Response {
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			ok: false,
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			statusMsg: "Internal server error",
			error: data,
		});
	}
}