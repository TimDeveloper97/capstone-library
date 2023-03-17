package com.sb.brothers.capstone.util;

public class ResData<T>
{
    Integer code;
    T value;

    public ResData() {
    }

    public ResData(Integer code, T value) {
        this.code = code;
        this.value = value;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
