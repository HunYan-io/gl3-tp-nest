import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { AddTodoDTO } from './add-todo.dto';
import { TodoStatusEnum } from './todo-status.enum';
import { UpdateTodoDTO } from './update-todo.dto';
import { CommonService } from '../common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { SearchDTO } from './search.dto';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  constructor(
    private commonService: CommonService,
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos() {
    return this.todos;
  }
  getTodosV2(searchDto: SearchDTO, page = 1, limit = 10) {
    const { criteria, status } = searchDto;
    if (!criteria && !status) {
      return this.todoRepository.find();
    }
    // find todos where name or description contains criteria or status is status
    // return this.todoRepository.find({
    //   where: [
    //     { name: Like(`%${criteria}%`) },
    //     { description: Like(`%${criteria}%`) },
    //     { status: status },
    //   ],
    // });
    // find todos where name or description contains criteria and status is status
    return this.todoRepository.find({
      where: [
        { name: Like(`%${criteria}%`), status: status },
        { description: Like(`%${criteria}%`), status: status },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  addTodo(todoDto: AddTodoDTO): Todo {
    const todo: Todo = {
      id: this.commonService.uniqueId(),
      name: todoDto.name,
      description: todoDto.description,
      createdAt: new Date(),
      status: TodoStatusEnum.waiting,
    };
    this.todos.push(todo);
    return todo;
  }
  addTodoV2(todoDto: AddTodoDTO) {
    return this.todoRepository.save(todoDto);
  }
  getTodoById(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id.toString() === id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
  async getTodoByIdV2(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
  deleteTodoById(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.todos.splice(index, 1);
  }
  deleteTodoByIdV2(id: number) {
    return this.todoRepository.softDelete(id);
  }
  updateTodoById(updateDto: UpdateTodoDTO, id: string): Todo[] {
    for (const todo of this.todos) {
      if (todo.id === id) {
        todo.name = updateDto.name;
        todo.description = updateDto.description;
        todo.status = updateDto.status;
        break;
      }
    }
    return this.todos;
  }
  updateTodoByIdV2(updateDto: UpdateTodoDTO, id: number) {
    return this.todoRepository.update(id, updateDto);
  }
  restoreTodoById(id: number) {
    return this.todoRepository.restore(id);
  }
  countTodosByStatus(status: string) {
    return this.todoRepository.count({
      where: { status: status as TodoStatusEnum },
    });
  }
}
