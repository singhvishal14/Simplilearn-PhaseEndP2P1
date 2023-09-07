IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [DeptMaster] (
    [DeptCode] int NOT NULL IDENTITY,
    [DeptName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_DeptMaster] PRIMARY KEY ([DeptCode])
);
GO

CREATE TABLE [EmpProfile] (
    [EmpCode] int NOT NULL IDENTITY,
    [DateOfBirth] datetime2 NOT NULL,
    [EmpName] nvarchar(max) NOT NULL,
    [DeptCode] int NOT NULL,
    CONSTRAINT [PK_EmpProfile] PRIMARY KEY ([EmpCode])
);
GO

CREATE TABLE [DeptMasterEmpProfile] (
    [DeptMasterDeptCode] int NOT NULL,
    [EmpProfileEmpCode] int NOT NULL,
    CONSTRAINT [PK_DeptMasterEmpProfile] PRIMARY KEY ([DeptMasterDeptCode], [EmpProfileEmpCode]),
    CONSTRAINT [FK_DeptMasterEmpProfile_DeptMaster_DeptMasterDeptCode] FOREIGN KEY ([DeptMasterDeptCode]) REFERENCES [DeptMaster] ([DeptCode]) ON DELETE CASCADE,
    CONSTRAINT [FK_DeptMasterEmpProfile_EmpProfile_EmpProfileEmpCode] FOREIGN KEY ([EmpProfileEmpCode]) REFERENCES [EmpProfile] ([EmpCode]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_DeptMasterEmpProfile_EmpProfileEmpCode] ON [DeptMasterEmpProfile] ([EmpProfileEmpCode]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230907072455_EmpMgmt', N'7.0.10');
GO

COMMIT;
GO

