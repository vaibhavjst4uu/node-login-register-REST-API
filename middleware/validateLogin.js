class AggregateError extends Error {
  constructor(errors) {
    super("Multiple errors occurred");
    this.name = this.constructor.name;
    this.errors = errors || [];
    this.statusCode = 422; // Unprocessable Entity status code
  }
}

// Example usage:
function login(username, password) {
  const errors = [];

  // Perform login validation
  if (!username) {
    errors.push("Username is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  // Additional login validation logic...

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  // If login fails due to invalid credentials
  throw new Error("Invalid username or password.");
}
