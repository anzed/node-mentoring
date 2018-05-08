import EventEmitter from 'events';
import fs from 'fs';

export default class Dirwatcher extends EventEmitter {
    watch(path, delay) {
        let prevFiles = [];
        let newFiles;

        setInterval(() => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    console.error(err);
                }

                if (this.hasFilesChanged(prevFiles, files)) {
                    newFiles = this.getNewFiles(prevFiles, files, path);

                    prevFiles = files;

                    this.emit('changed', newFiles);
                }
            });
        }, delay);
    }

    hasFilesChanged(prevFiles, nextFiles) {
        const sortedPrevfiles = prevFiles.sort();
        const sortedNextFiles = nextFiles.sort();

        if (prevFiles.length !== nextFiles.length) {
            return true;
        }

        for (let i = 0; i < sortedNextFiles.length; i++) {
            if (sortedPrevfiles[i] !== sortedNextFiles[i]) {
                return true;
            }
        }

        return false;
    }

    getNewFiles(prevFiles, nextFiles, path) {
        const paths = [];

        nextFiles.forEach((file) => {
            if (!prevFiles.includes(file)) {
                const pathToFile = `${path}/${file}`;

                paths.push(pathToFile);
            }
        });

        return paths;
    }
}

