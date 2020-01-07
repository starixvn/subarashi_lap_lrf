USE SiteConfig
GO
/*
	 Creator: 20200107@Walter [redmine:#125780]
	 Database: DBCUST.SITECONFIG

	 Revisions:
	 - 20200107@Walter: Initialize new permission keys for BTC [redmine:#125780]
	 
	 Developer's Note
	 - Macaubet licensee will not has Multi-Customers (Advanced Search) permission, the other will have all new permissions

     BTC_MultiCustomer: Multi-Customers
     BTC_SingleCustomer: Single Customer
     BTC_RefNo: Ref No
     BTC_Running: Running
*/

-- For group
INSERT INTO dbo.GroupFuncPermission(UserGroupSEQ, FunctionKey, SiteName)
SELECT UserGroupSEQ, 'BTC_MultiCustomer', SiteName
FROM GroupFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79' AND SiteName <> 'Macaubet'

INSERT INTO dbo.GroupFuncPermission(UserGroupSEQ, FunctionKey, SiteName)
SELECT UserGroupSEQ, 'BTC_SingleCustomer', SiteName
FROM GroupFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79'

INSERT INTO dbo.GroupFuncPermission(UserGroupSEQ, FunctionKey, SiteName)
SELECT UserGroupSEQ, 'BTC_RefNo', SiteName
FROM GroupFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79'

INSERT INTO dbo.GroupFuncPermission(UserGroupSEQ, FunctionKey, SiteName)
SELECT UserGroupSEQ, 'BTC_Running', SiteName
FROM GroupFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79'

-- For individual
INSERT INTO dbo.UserFuncPermission(UserSEQ, FunctionKey, SiteName, SystemType, IsAllow)
SELECT UserSEQ, 'BTC_MultiCustomer', SiteName, 1, 1
FROM UserFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79' AND SiteName <> 'Macaubet'

INSERT INTO dbo.UserFuncPermission(UserSEQ, FunctionKey, SiteName, SystemType, IsAllow)
SELECT UserSEQ, 'BTC_SingleCustomer', SiteName, 1, 1
FROM UserFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79'

INSERT INTO dbo.UserFuncPermission(UserSEQ, FunctionKey, SiteName, SystemType, IsAllow)
SELECT UserSEQ, 'BTC_RefNo', SiteName, 1, 1
FROM UserFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79'

INSERT INTO dbo.UserFuncPermission(UserSEQ, FunctionKey, SiteName, SystemType, IsAllow)
SELECT UserSEQ, 'BTC_Running', SiteName, 1, 1
FROM UserFuncPermission WITH (NOLOCK)
WHERE FunctionKey = 'BTC79'

GO