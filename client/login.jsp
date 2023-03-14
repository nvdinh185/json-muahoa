<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<title>Form User | VinaEnter Edu</title>  
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<link href="<%=request.getContextPath() %>/muahoa/css/style1.css" rel="stylesheet" type="text/css" media="all"/>

</head>
<body>
	<!-- login starts here -->
	<div class="login agile">
		<div class="w3agile-border">
			<h2>Login Form | VinaEnter Edu</h2>
			<div class="login-main login-agileits"> 
			<p style="color: red; background-color: yellow; font-weight: bold; font-style: italic">${err}</p>
				<h1>Login</h1> 
				<form method="post">
					<p>Username (*)</p>
					<input type="text" placeholder="example@gmail.com" name="username" value="${username}" />
					<p>Password (*)</p>
					<input type="password" placeholder="Password" name="password" />
					
					<input type="submit" value="Login">
				</form>
			</div>
		</div> 
	</div>
</body>
</html>