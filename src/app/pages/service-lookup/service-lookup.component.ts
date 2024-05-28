import { Component, OnInit } from '@angular/core';
import { Service, Specialist } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-service-lookup',
  templateUrl: './service-lookup.component.html',
  styleUrls: ['./service-lookup.component.css']
})
export class ServiceLookupComponent implements OnInit{
  listOfData: Service[] = [];
  filteredService: Service[] = [];
  specialistList: Specialist[] = [
    {
      specialistId: '1',
      name: 'Tất cả',
      id: '1',
    }  
  ];
  pageSize: number = 10;
  pageIndex: number = 1;
  total: any;
  serviceName: string = '';
  specialist: string = '';
  specialistItem: Specialist = {
    specialistId: '',
    name: '',
    id: '',
  }

  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) { }

  demo(data:any){
    console.log(data)
  }

  onSpecialistChange(value: string): void {
    if(value == '1'){
      this.getService()
      return;
    }
    this.appService.find<any>('/services/specialist/' + value).subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        console.log(response.body)
        this.listOfData = response.body.data;
        this.filteredService = this.listOfData;
        // return this.message.success(res.body.message)
      }
    })
  }

  filterSchedule(): void {
    const searchTerm = this.serviceName.toLowerCase();
    if (!searchTerm) {
      this.filteredService = this.listOfData;
    } else {
      this.filteredService = this.listOfData.filter((service: any) => {
        const serviceId = service.serviceId.toString().toLowerCase();
        const serviceNames = service.name?.toLowerCase() || '';
        return serviceId.includes(searchTerm) || serviceNames.includes(searchTerm);
      });
    }
  }

  getService(){
    this.appService.find<any>('/services').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.listOfData = response.body.data.results;
        this.filteredService = this.listOfData;
        this.total = response.body.data.totalResults;
        this.pageSize = response.body.data.limit;
        this.pageIndex = response.body.data.page;
        // return this.message.success(res.body.message)
      }
    });
  
  }

  ngOnInit() {
    this.getService();
    this.appService.find<any>('/specialist').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.specialistList.push(...response.body.data.results);
        // return this.message.success(res.body.message)
      }
    });
  }
}
