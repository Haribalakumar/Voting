package com.kgisl.vote;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import java.sql.Statement;
import java.util.ArrayList;


public class PollingDAO {
    private String jdbcURL;
    private String jdbcUsername;
    private String jdbcPassword;
    private Connection jdbcConnection;
    private static PollingDAO pollingDAO;
    
    private PollingDAO(String jdbcURL, String jdbcUsername, String jdbcPassword) {
        this.jdbcURL = jdbcURL;
        this.jdbcUsername = jdbcUsername;
        this.jdbcPassword = jdbcPassword;
    }
    public static PollingDAO getInstance(String jdbcURL, String jdbcUsername, String jdbcPassword) {
        if (pollingDAO == null) {
            pollingDAO = new PollingDAO(jdbcURL, jdbcUsername, jdbcPassword);
        }
        return pollingDAO;
    }
    protected void connect() throws SQLException {
        if (jdbcConnection == null || jdbcConnection.isClosed()) {
            jdbcConnection = DriverManager.getConnection(
                    jdbcURL, jdbcUsername, jdbcPassword);
        }
    }
    protected void disconnect() throws SQLException {
        if (jdbcConnection != null && !jdbcConnection.isClosed()) {
            jdbcConnection.close();
        }
    }
    public List<Polling> listAllPollings() throws SQLException {
        List<Polling> PollingList = new ArrayList<Polling>();
        String sql = "SELECT * FROM pollingDetail";
        connect();
        Statement statement = jdbcConnection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            String voter_id = resultSet.getString("voter_id");
            String party_name = resultSet.getString("party_name");
            String ward = resultSet.getString("ward");
            Polling polling = new Polling(voter_id, party_name, ward);
            PollingList.add(polling);
        }
        resultSet.close();
        statement.close();
        disconnect();
        return PollingList;
    }
    public boolean insertPollings(Polling polling) throws SQLException {
        String sql = "INSERT INTO pollingDetail (voter_id, party_name, ward) VALUES (?,?,?)";
        System.out.println(sql);
        connect();
        PreparedStatement statement = jdbcConnection.prepareStatement(sql);
        statement.setString(1, polling.getVoter_id());
        statement.setString(2, polling.getParty_name());
        statement.setString(3, polling.getWard());
        boolean rowInserted = statement.executeUpdate() > 0;
        statement.close();
        disconnect();
        return rowInserted;
    }
}
