import * as fs from "fs/promises";

interface ObjectEntity {
  id: number;
  [key: string]: any;
}

export class Contenedor {
  private data: ObjectEntity[] = [];
  private path: string;
  private firstCall = true;

  constructor(private fileName: string) {
    this.path = `${__dirname}/${this.fileName}`;
  }

  async save(Object: Object): Promise<number> {
    if (this.firstCall) {
      await this.findOrCreate();
      this.firstCall = false;
    }
    const newData: ObjectEntity = this.addId(Object);
    this.data.push(newData);
    await this.writeFile();

    return newData.id;
  }

  async findOrCreate() {
    try {
      await fs.access(this.path);
      const fileData = await fs.readFile(this.path, "utf-8");
      this.data = JSON.parse(fileData);
      console.log("la data leida es:", this.data);
    } catch (err) {
      console.log(err);
    }
  }

  async writeFile(): Promise<void> {
    try {
      await fs.writeFile(
        this.path,
        this.data.length ? JSON.stringify(this.data) : " "
      );
    } catch (err) {
      throw new Error("No se pudo escribir el archivo");
    }
  }
  addId(Object: Object): ObjectEntity {
    const newObject: ObjectEntity = Object as ObjectEntity;
    newObject.id = this.data.length + 1;
    return newObject;
  }
  getAll(): ObjectEntity[] {
    return this.data;
  }
  deleteById(id: number): void {
    this.data = this.data.filter((Object) => Object.id !== id);
    this.writeFile();
  }
  deleteAll(): void {
    this.data = [];
    fs.unlink(this.path);
    this.firstCall = true;
  }
  getById(id: number): ObjectEntity | null {
    return this.data.find((Object) => Object.id === id) || null;
  }
}
