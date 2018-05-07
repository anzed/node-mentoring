import EventEmitter from 'events';
import fs from 'fs';

export default class Dirwatcher extends EventEmitter {
    constructor(path, delay) {
        super();

        this.path = path;
        this.delay = delay;
    }

    watch() {
        let prevFiles = [];
        let newFiles;

        setInterval(() => {
            fs.readdir(this.path, (err, files) => {
                if (err) {
                    console.error(err);
                }

                if (this.hasFilesChanged(prevFiles, files)) {
                    newFiles = this.getNewFiles(prevFiles, files);

                    prevFiles = files;

                    this.emit('changed', newFiles);
                }
            });
        }, this.delay);
    }

    hasFilesChanged(prevFiles, nextFiles) {
        const sortedPrevfiles = prevFiles.sort();
        const sortedNextFiles = nextFiles.sort();

        if (prevFiles.length !== nextFiles.length) {
            return true;
        }

        for (let i = 0; i < sortedNextFiles.length; i + 1) {
            if (sortedPrevfiles[i] !== sortedNextFiles[i]) {
                return true;
            }
        }

        return false;
    }

    getNewFiles(prevFiles, nextFiles) {
        const paths = [];

        nextFiles.forEach((file) => {
            if (!prevFiles.includes(file)) {
                const pathToFile = `${this.path}/${file}`;

                paths.push(pathToFile);
            }
        });

        return paths;
    }
}

