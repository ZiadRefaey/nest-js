import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: CreateTaskDto[] = [];
  private id = 1;

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: this.id++,
      ...createTaskDto,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error('Task not found');
    }

    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new Error('Task not found');
    }

    const deletedTask = this.tasks[index];
    this.tasks.splice(index, 1);

    return deletedTask;
  }
}
