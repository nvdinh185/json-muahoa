<%@page import="model.bean.Users"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.bean.Hoa"%>
<%@ page import="model.bean.LoaiHoa"%>
<%@ page import="model.dao.HoaDAO"%>
<%@ page import="model.dao.LoaiHoaDAO"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Mua hoa</title>
		<link rel="icon" type="image/png" href="<%=request.getContextPath()%>/muahoa/images/icon.jpg"/>
		<link href="<%=request.getContextPath() %>/muahoa/css/reset.css" rel="stylesheet" type="text/css">
		<link href="<%=request.getContextPath() %>/muahoa/css/style.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div id="header">
			<div id="header-status">
				<div class="container_12">
					<div class="grid_4">
						<ul class="user-pro">
						<%
							Users userLogin = (Users) session.getAttribute("userLogin");
							if(userLogin!=null){
						%>
							<li><a href="<%=request.getContextPath()%>/logout">Logout</a></li>
							<li><img style="width: 20px; height: 20px" alt="<%=userLogin.getAvatar() %>" src="<%=request.getContextPath()%>/muahoa/images/<%=userLogin.getAvatar()%>"></li>
							<li>Chào, <a href=""><%=userLogin.getFullName() %></a></li>
						<%
						} else {
						%>
							<li><a href="<%=request.getContextPath()%>/login">Login</a></li>
						<%} %>
						</ul>
					</div>
				</div>
				<div style="clear: both;"></div>
			</div>
	
			<div id="header-main">
				<div class="container_12">
					<div class="grid_12">
						<div id="logo">
							<ul id="nav">
								<li><a href="<%=request.getContextPath() %>/index">Trang chủ</a></li>
								<li><a href="<%=request.getContextPath() %>/them-hoa">Mua hoa</a></li>
								<li><a href="<%=request.getContextPath() %>/them-loai-hoa">Thêm danh mục</a></li>
								<li><a href="<%=request.getContextPath() %>/xem-hoa">Xem danh sách</a></li>
							</ul>
						</div>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			
			<div style="clear: both;"></div>
			
			<div id="subnav">
				<div class="container_12">
					<div class="grid_12">
						<ul>
							<li><a href="list.html">sản phẩm</a></li>
							<li><a href="list.html">Danh mục sản phẩm</a></li>
							<li><a href="add.html">Giới thiệu</a></li>
							<li><a href="list.html">Đơn hàng</a></li>
							<li><a href="list.html">Liên hệ</a></li>
						</ul>
					</div>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>