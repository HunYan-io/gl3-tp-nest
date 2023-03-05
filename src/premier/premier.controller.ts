import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get()
  getPremier() {
    console.log('getPremier');
    return 'getPremier';
  }
  @Post()
  postPremier() {
    console.log('postPremier');
    return 'postPremier';
  }
  @Put()
  putPremier() {
    console.log('putPremier');
    return 'putPremier';
  }
  @Patch()
  patchPremier() {
    console.log('patchPremier');
    return 'patchPremier';
  }
  @Delete()
  deletePremier() {
    console.log('deletePremier');
    return 'deletePremier';
  }
}
