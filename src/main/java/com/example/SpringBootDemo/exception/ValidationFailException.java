package com.example.SpringBootDemo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ValidationFailException extends RuntimeException{

    public ValidationFailException() {
        super();
    }

    public ValidationFailException(String message) {
        super(message);
    }

    public ValidationFailException(String message, Throwable cause) {
        super(message, cause);
    }

    public ValidationFailException(Throwable cause) {
        super(cause);
    }
}
