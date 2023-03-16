package com.sb.brothers.capstone.util;

import com.sb.brothers.capstone.dto.LoginRespDto;

public class ResLoginData extends ResData<LoginRespDto>
{
    String token;

    public ResLoginData(String token) {
        this.token = token;
    }

    public ResLoginData(Integer code, LoginRespDto value, String token) {
        super(code, value);
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
