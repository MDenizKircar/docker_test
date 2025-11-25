using Microsoft.Data.Sqlite;
using Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder.WithOrigins("http://localhost:3000", "http://localhost:5173")  // Allow your React frontend to access the API
                          .AllowAnyMethod()  // Allow any HTTP method (GET, POST, etc.)
                          .AllowAnyHeader()); // Allow any headers
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Connection string to your SQLite file
var connectionString =
    Environment.GetEnvironmentVariable("DB_CONNECTION")
    ?? "Data Source=../../docker_app-database/db.sqlite";

// Make sure the database/table exist
Database.EnsureDatabase(ConnectionString);

// Minimal API endpoints

// GET /api/items  -> read all items
app.MapGet("/api/items", () =>
{
    var items = new List<Item>();

    using var connection = new SqliteConnection(ConnectionString);
    connection.Open();

    var cmd = connection.CreateCommand();
    cmd.CommandText = @"
        SELECT Id, Name
        FROM Items
        ORDER BY Id DESC
        LIMIT 3;
    ";

    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        var item = new Item
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
        };

        items.Add(item);
    }

    return Results.Ok(items);
});

// GET /api/items/{id} -> read single item
app.MapGet("/api/items/{id:int}", (int id) =>
{
    using var connection = new SqliteConnection(ConnectionString);
    connection.Open();

    var cmd = connection.CreateCommand();
    cmd.CommandText = @"
        SELECT Id, Name
        FROM Items
        WHERE Id = $id;
    ";
    cmd.Parameters.AddWithValue("$id", id);

    using var reader = cmd.ExecuteReader();
    if (!reader.Read())
    {
        return Results.NotFound();
    }

    var item = new Item
    {
        Id = reader.GetInt32(0),
        Name = reader.GetString(1),
    };

    return Results.Ok(item);
});

// POST /api/items  -> create new item
app.MapPost("/api/items", (CreateItemDto dto) =>
{
    if (string.IsNullOrWhiteSpace(dto.Name))
    {
        return Results.BadRequest("Name is required.");
    }

    int newId;

    using (var connection = new SqliteConnection(ConnectionString))
    {
        connection.Open();

        var cmd = connection.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO Items (Name)
            VALUES ($name);
            SELECT last_insert_rowid();
        ";

        cmd.Parameters.AddWithValue("$name", dto.Name);

        newId = Convert.ToInt32(cmd.ExecuteScalar());
    }

    var createdItem = new Item
    {
        Id = newId,
        Name = dto.Name
    };

    return Results.Ok(createdItem);
});

app.UseCors("AllowFrontend"); 
app.Run();

// Helper for DB setup
static class Database
{
    public static void EnsureDatabase(string connectionString)
    {
        var builder = new SqliteConnectionStringBuilder(connectionString);
        var dataSource = builder.DataSource;

        var directory = Path.GetDirectoryName(dataSource);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        var cmd = connection.CreateCommand();
        cmd.CommandText = @"
            CREATE TABLE IF NOT EXISTS Items (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL
            );
        ";
        cmd.ExecuteNonQuery();
    }
}
