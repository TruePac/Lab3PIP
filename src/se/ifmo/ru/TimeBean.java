package se.ifmo.ru;

import java.util.Date;

public class TimeBean {
	
	private Date currentDate = new Date();

    public Date getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(Date currentDate) {
        this.currentDate = currentDate;
    }

}
