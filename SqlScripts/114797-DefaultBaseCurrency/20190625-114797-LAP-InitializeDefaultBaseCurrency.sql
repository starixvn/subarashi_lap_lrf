USE SiteConfig
GO

/*
	 Creator: 20190625@Amanda [redmine:#114797]
	 Database: DBCUST.SITECONFIG

	 Revisions:
	 - 20190625@Amanda: Initialize default based currency for LAP users [redmine:#114797]
	 
	 Developer's Note
		1. Bodog : USD
		2. KeenOcean : CNY
		3. Macaubet : IDR
		4. Opal88, Ivorybet: USD
*/
--1. Bodog licensee
UPDATE s
SET s.BasedCurrencyCode = 'USD'
FROM dbo.UserDefaultSettings s WITH (ROWLOCK, UPDLOCK)
WHERE EXISTS (SELECT 1 FROM dbo.Users u WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ AND u.SiteName = 'Bodog')

INSERT INTO dbo.UserDefaultSettings (UserSEQ, BasedCurrencyCode, LangCode, DepositWithdrawSound)
SELECT UserSEQ, 'USD', NULL, 0
FROM dbo.Users u WITH (NOLOCK)
WHERE u.SiteName = 'Bodog' AND NOT EXISTS (SELECT 1 FROM dbo.UserDefaultSettings s WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ)

--2. KeenOcean licensee
UPDATE s
SET s.BasedCurrencyCode = 'CNY'
FROM dbo.UserDefaultSettings s WITH (ROWLOCK, UPDLOCK)
WHERE EXISTS (SELECT 1 FROM dbo.Users u WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ AND u.SiteName = 'KeenOcean')

INSERT INTO dbo.UserDefaultSettings (UserSEQ, BasedCurrencyCode, LangCode, DepositWithdrawSound)
SELECT UserSEQ, 'CNY', NULL, 0
FROM dbo.Users u WITH (NOLOCK)
WHERE u.SiteName = 'KeenOcean' AND NOT EXISTS (SELECT 1 FROM dbo.UserDefaultSettings s WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ)

--3. Macaubet licensee
UPDATE s
SET s.BasedCurrencyCode = 'IDR'
FROM dbo.UserDefaultSettings s WITH (ROWLOCK, UPDLOCK)
WHERE EXISTS (SELECT 1 FROM dbo.Users u WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ AND u.SiteName = 'Macaubet')

INSERT INTO dbo.UserDefaultSettings (UserSEQ, BasedCurrencyCode, LangCode, DepositWithdrawSound)
SELECT UserSEQ, 'IDR', NULL, 0
FROM dbo.Users u WITH (NOLOCK)
WHERE u.SiteName = 'Macaubet' AND NOT EXISTS (SELECT 1 FROM dbo.UserDefaultSettings s WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ)

--4. Opal88, Ivorybet licensee
UPDATE s
SET s.BasedCurrencyCode = 'USD'
FROM dbo.UserDefaultSettings s WITH (ROWLOCK, UPDLOCK)
WHERE EXISTS (SELECT 1 FROM dbo.Users u WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ AND (u.SiteName = 'Ivorybet' OR u.SiteName = 'Opal88'))

INSERT INTO dbo.UserDefaultSettings (UserSEQ, BasedCurrencyCode, LangCode, DepositWithdrawSound)
SELECT UserSEQ, 'USD', NULL, 0
FROM dbo.Users u WITH (NOLOCK)
WHERE (u.SiteName = 'Ivorybet' OR u.SiteName = 'Opal88') AND NOT EXISTS (SELECT 1 FROM dbo.UserDefaultSettings s WITH (NOLOCK) WHERE s.UserSEQ = u.UserSEQ)

GO
