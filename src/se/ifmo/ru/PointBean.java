package se.ifmo.ru;

import java.sql.SQLException;
import java.util.ArrayList;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.event.AjaxBehaviorEvent;

@ManagedBean
@SessionScoped
public class PointBean {
	private String X;
	private String Y;
	private String R;
	private String hit = "false";
	private static ArrayList<Point> pointsList = new ArrayList<Point>();

	public PointBean() {

	}
	
	public ArrayList<Point> getPointsList() {

		return pointsList;

	}

	public String getX() {
		return this.X;
	}

	public void setX(final String x) {
		this.X = x;

	}
	
	public String getY() {
		return this.Y;
	}

	public void setY(final String y) {
		this.Y = y;

	}
	
	public String getR() {
		return this.R;
	}

	public void setR(final String r) {
		this.R =r;

	}

	public String getHit() {
		return this.hit;
	}

	public void setHit(String hit) {
		this.hit = hit;
	}
	
	public void rChange(AjaxBehaviorEvent ev) {
	    for (Point p : pointsList ){
	    	p.setR(Double.valueOf(R));
	    	p.setHit(checkHit(p));
	    }
	} 
	
	public void addPoint() throws ClassNotFoundException, SQLException {
		Point p = new Point(this.X, this.Y, this.R, this.hit);
		p.setHit(checkHit(p));
		pointsList.add(p);
		JDBC oracle = new JDBC();
		oracle.addToDB(p.getX(), p.getY(), p.getR(), p.getHit());
		
	}
	
	public boolean checkHit(Point p){
		boolean hit;
		if (checkRound(p) || checkTriangle(p) || checkRectangle(p)) {
			hit = true;
		} else hit=false;	
		return hit;
	}
	
	public boolean checkRound(Point p){
		 if ((p.X*p.X + p.Y*p.Y <= (p.R/2)*(p.R/2)) && (p.X <= 0) && (p.Y <= 0))
		        return true;
		    else
		    	return false;
	}
	
	public boolean checkRectangle(Point p){
		if ((Math.abs(p.X)<= p.R) && (p.Y <= p.R/2) && (p.X <= 0) && (p.Y >= 0))
	        return true;
	    else
	        return false;
	}
	
	public boolean checkTriangle(Point p){
		if (p.X >= 0 && p.Y <= 0) {
	        double r1 = (p.R/2 - p.X) * ((-p.R) - 0) - (0 - p.R/2) * (0 - p.Y);
	        double r2 = (0 - p.X) * (0 - (-p.R)) - (0 - 0) * ((-p.R) - p.Y);
	        double r3 = (0 - p.X) * (0 - 0) - (p.R/2 - 0) * (0 - p.Y);
	        if ((r1 > 0 && r2 > 0 && r3 > 0) || (r1 < 0 && r2 < 0 && r3 < 0) || r1 == 0 || r2 == 0 || r3 == 0)
	            return true;
	        else
	            return false;
	    } else
	        return false;
	}
	
	

	public static class Point {
		double X;
		double Y;
		double R;
		boolean hit;

		public Point(String x, String y, String r, String hit) {
			this.X = Double.parseDouble(x);
			this.Y = Double.parseDouble(y);
			this.R = Double.parseDouble(r);
			this.hit = Boolean.parseBoolean(hit);
		}
		
		public double getX() {
			return this.X;
		}

		public void setX(final double x) {
			this.X = x;

		}
		
		public double getY() {
			return this.Y;
		}

		public void setY(final double y) {
			this.Y = y;

		}
		
		public double getR() {
			return this.R;
		}

		public void setR(final double r) {
			this.R =r;

		}

		public boolean getHit() {
			return this.hit;
		}

		public void setHit(boolean hit) {
			this.hit = hit;
		} 

	}

}
