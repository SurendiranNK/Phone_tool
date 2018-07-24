import { Injectable } from '@angular/core';

@Injectable()
export class DataShare{

 public logindetails: any;
 public edit_client:string;
 public Edit_Client_Detials: any;

 public edit_site:string;
 public Edit_Site_Detials: any;

 public edit_tecnician:string;
 public Edit_technician_Detials: any;


   public edit_deviceimage:string;
 public Edit_deviceimage_Detials: any;

 public edit_testsuites:boolean;
 public Edit_TestSuites_Detials: any;

 /*

public login_API: string ='http://localhost:3000/api/authenticate';

public Changepassword_API:string ='http://localhost:3000/api/editpassword';

//public Previous_Report_API: string ='http://aryvartdev.com/clara_phonetool/api/Report/reports'
public Previous_Report_API: string ='http://localhost:3000/getprereport';

public Display_Clientdetails_API: string ='http://localhost:3000/api/client_details';

public Display_Techniciandetails_API: string ='http://localhost:3000/api/technician_details';

public Display_Sitesdetails_API: string ='http://localhost:3000/api/site_details';


public Client_Register_API: string ='http://localhost:3000/api/client_register';


public Technician_Register_API: string ='http://localhost:3000/api/technician_register';

public Sites_Register_API: string ='http://localhost:3000/api/site_register';

public Test_Suites_API: string ='http://localhost:3000/api/testsuites_register';


public Client_Edit_API: string ='http://localhost:3000/api/edit_client';



public Site_Edit_API: string ='http://localhost:3000/api/edit_site';

public Technician_Edit_API: string ='http://localhost:3000/api/edit_technician';


public Display_Testsuites_API: string ='http://localhost:3000/api/testsuites_details';

public Display_Deviceimages_API: string='http://localhost:3000/api/device_images_details'; */





public login_API: string ='http://localhost:3000/login';

public Changepassword_API:string ='http://localhost:3000/editpassword';

//public Previous_Report_API: string ='http://aryvartdev.com/clara_phonetool/api/Report/reports'
public Previous_Report_API: string ='http://localhost:3000/getprereport';


public Display_Clientdetails_API: string ='http://localhost:3000/client_details';

public Display_Techniciandetails_API: string ='http://localhost:3000/technician_details';

public Display_Sitesdetails_API: string ='http://localhost:3000/site_details';


public Client_Register_API: string ='http://localhost:3000/client_register';


public Technician_Register_API: string ='http://localhost:3000/technician_register';

public Sites_Register_API: string ='http://localhost:3000/site_register';

public Test_Suites_API: string ='http://localhost:3000/testsuites_register';


public Client_Edit_API: string ='http://localhost:3000/edit_client';



public Site_Edit_API: string ='http://localhost:3000/edit_site';

public Technician_Edit_API: string ='http://localhost:3000/edit_technician';


public Display_Testsuites_API: string ='http://localhost:3000/testsuites_details';

public Display_Deviceimages_API: string='http://localhost:3000/device_images_details';

public Display_register_devicimages_API: string='http://localhost:3000/device_images_register';


public Register_Deviceimages_API: string='http://localhost:3000/device_images_register';

public Edit_Deviceimages_API: string='http://localhost:3000/device_images_edit';










    public constructor() { }

}
