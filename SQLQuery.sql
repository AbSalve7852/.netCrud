CREATE PROCEDURE SelectEmployee
AS
BEGIN
	SELECT *
	FROM Employee;
END 

GO

--Insert and Update Employee
CREATE PROCEDURE InsertUpdateEmployee (
	@Id INTEGER
	,@Name NVARCHAR(50)
	,@Phone INTEGER
	,@Email NVARCHAR(50)
	,@City NVARCHAR(50)
	,@Action VARCHAR(10)
	)
AS
BEGIN
	IF @Action = 'Insert'
	BEGIN
		INSERT INTO Employee (
			Name
			,Phone
			,Email
			,City
			)
		VALUES (
			@Name
			,@Phone
			,@Email
			,@City
			);
	END

	IF @Action = 'Update'
	BEGIN
		UPDATE Employee
		SET Name = @Name
			,Phone = @Phone
			,@Email = @Email
			,City = @City
		WHERE EmployeeID = @Id;
	END
END 

GO

--Delete Employee
CREATE PROCEDURE DeleteEmployee (@Id INTEGER)
AS
BEGIN
	DELETE Employee
	WHERE EmployeeID = @Id;
END
select * from Employee
