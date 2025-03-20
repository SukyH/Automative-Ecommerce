package com.ecommerce.Ecommerce.enums;

	public enum OrderStatus {
	    PROCESSED("PENDING"),
	    DENIED("SHIPPED"),
	    ORDERED("DELIVERED");
	   

	    private final String value;

	    OrderStatus(String value) {
	        this.value = value;
	    }

	    public String getValue() {
	        return value;
	    }

	    public static OrderStatus fromValue(String value) {
	        for (OrderStatus status : OrderStatus.values()) {
	            if (status.getValue().equalsIgnoreCase(value)) {
	                return status;
	            }
	        }
	        throw new IllegalArgumentException("Invalid OrderStatus value: " + value);
	    }
	}
