// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that deals with updating and displaying comments section.*/
@WebServlet("/url")
public class UrlServlet extends HttpServlet {
  private Gson gson = new Gson();

  // function called when /url is fetched (in myscript.js)
  // reads from database
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("videoURL").addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    List<Entity> listOfComments = results.asList(
        FetchOptions.Builder.withLimit(Integer.parseInt(request.getParameter("number"))));

    List<String> comments = new ArrayList<>();

    for (Entity entity : listOfComments) {
      String comment = (String) entity.getProperty("user-submission");
      comments.add(comment);
    }

    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(comments));
  }

  // function called when method="post" (when button is pressed; see index.html)
  // writes to database
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Entity commentEntity = new Entity("videoURL");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    String user_comment = request.getParameter("user-submission");
    long timestamp = System.currentTimeMillis();

    commentEntity.setProperty("user-submission", user_comment);
    commentEntity.setProperty("timestamp", timestamp);
    datastore.put(commentEntity);

    response.sendRedirect("/index.html");

    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println("<script> openTab(event, 'Database Tests') </script>");
  }
}
