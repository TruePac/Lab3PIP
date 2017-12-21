package se.ifmo.ru;

import java.sql.*;
import java.util.Locale;

public class JDBC {
	private static Connection connection;
	private static PreparedStatement statement;
	private static String url = "jdbc:oracle:thin:s225041/2PGfTyYX@localhost:1521/orbis";

	public void addToDB(double x, double y, double r, boolean hit) throws SQLException, ClassNotFoundException {
		try {
		Locale.setDefault(Locale.ENGLISH);
		Class.forName("oracle.jdbc.driver.OracleDriver");
		connection = DriverManager.getConnection(url);
		statement = connection.prepareStatement("INSERT INTO POINTS (X, Y, R, HIT) VALUES (?, ?, ?, ?)");

		char h;
		if (hit) {
			h='Y';
		} else h='N';
		
		statement.setDouble(1, x);
		statement.setDouble(2, y);
		statement.setDouble(3, r);
		statement.setString(4, String.valueOf(h));

		statement.executeUpdate();

		statement.close();
		connection.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
