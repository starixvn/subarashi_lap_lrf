USE [bodb_CustomerLog]
GO

/*
	Created: 20191003@Walter
	DB: DBLOG.bodb_CustomerLog
	Task: Write Log for Player Admin [#FeatureID 112658]
	Description: Insert into DBLOG.bodb_CustomerLog.LogAction
*/

INSERT INTO [dbo].[LogAction]
           ([ActionID]
           ,[SPName]
           ,[ActionNameEN]
           ,[ActionNameCH]
           ,[ActionNameCS]
           ,[ActionNameJP]
           ,[ActionNameIT]
           ,[ActionNameTH]
           ,[ActionNameKO]
           ,[IsInternal]
           ,[ActionNameVI]
           ,[ActionNameCN])
     VALUES
           (5550,'Lrf_CustomerUpdMemberBAStatus','BA Status (Player Admin)','','','','','','',0,'',''),
           (5551,'Lrf_CustomerUpdUgroup','Odds Group (Player Admin)','','','','','','',0,'',''),
           (5552,'Lrf_CustomerUpdSpecialLevel','Special Level (Player Admin)','','','','','','',0,'',''),
		   (5556,'','Player Status (Player Admin)','','','','','','',0,'',''),
		   (5557,'','Reset Password (Player Admin)','','','','','','',0,'',''),
		   (5558,'','Change Password (Player Admin)','','','','','','',0,'',''),
		   (5559,'','Bank Information (Player Admin)','','','','','','',0,'',''),
		   (5560,'','Bank Account Reset (Player Admin)','','','','','','',0,'',''),
		   (5561,'','Bet Limit (Player Admin)','','','','','','',0,'',''),
		   (5562,'','Note (Player Admin)','','','','','','',0,'',''),
		   (5563,'','Personal Message (Player Admin)','','','','','','',0,'',''),
		   (5564,'','Fund Transfer Limit (Player Admin)','','','','','','',0,'',''),
		   (5565,'','Commission (Player Admin)','','','','','','',0,'','')
GO