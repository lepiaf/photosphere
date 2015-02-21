var database = {
    photos: [
        {
            name: "0001",
            camera: {
                alpha: 0,
                beta: Math.PI/2
            },
            neighbors: [
                {
                    name: "0002",
                    cursor: {
                        x: -9,
                        y: -6,
                        z: 0,
                        rotate: {
                            x: -.2,
                            y: 0,
                            z: -(Math.PI/2)-0.1
                        }
                    }
                }
            ]
        },
        {
            name: "0002",
            camera: {
                alpha: 0,
                beta: Math.PI/2
            },
            neighbors: [
                {
                    name: "0001",
                    cursor: {
                        x: 12,
                        y: -5,
                        z: 0,
                        rotate: {
                            x: 0,
                            y: 0,
                            z: (Math.PI/2)+.1
                        }
                    }
                },
                {
                    name: "0003",
                    cursor: {
                        x: 1,
                        y: -5,
                        z: 7,
                        rotate: {
                            x: -(Math.PI/2),
                            y: 0,
                            z: 0
                        }
                    }
                }
            ]
        },
        {
            name: "0003",
            camera: {
                alpha: (Math.PI/2),
                beta: Math.PI/2
            },
            neighbors: [
                {
                    name: "0002",
                    cursor: {
                        x: 0,
                        y: -3,
                        z: 9,
                        rotate: {
                            x: -(Math.PI/2),
                            y: 0,
                            z: .1
                        }
                    }
                },
                {
                    name: "0004",
                    cursor: {
                        x: 10,
                        y: -3,
                        z: 0,
                        rotate: {
                            x: -(Math.PI/2),
                            y: 0,
                            z: (Math.PI/2)
                        }
                    }
                }
            ]
        },
        {
            name: "0004",
            camera: {
                alpha: Math.PI,
                beta: Math.PI/2
            },
            neighbors: [
                {
                    name: "0003",
                    cursor: {
                        x: -10,
                        y: -5,
                        z: 5,
                        rotate: {
                            x: 0, y: (Math.PI/2)-1, z: -(Math.PI/2)
                        }
                    }
                },
                {
                    name: "0005",
                    cursor: {
                        x: -2,
                        y: -5,
                        z: 10,
                        rotate: {
                            x: -(Math.PI/2), y: 0, z: 0
                        }
                    }
                }
            ]
        },
        {
            name: "0005",
            camera: {
                alpha: 0,
                beta: Math.PI/2
            },
            neighbors: [
                {
                    name: "0006",
                    cursor: {
                        x: -10,
                        y: -5,
                        z: 5,
                        rotate: {
                            x: 0, y: (Math.PI/2)-1.5, z: -(Math.PI/2)
                        }
                    }
                },
                {
                    name: "0004",
                    cursor: {
                        x: -2,
                        y: -5,
                        z: 10,
                        rotate: {
                            x: -(Math.PI/2), y: 0, z: 0
                        }
                    }
                }
            ]
        },
        {
            name: "0006",
            camera: {
                alpha: -(Math.PI/2),
                beta: Math.PI/2
            },
            neighbors: [
                {
                    name: "0005",
                    cursor: {
                        x: 7,
                        y: -5,
                        z: -15,
                        rotate: {
                            x: (Math.PI/2), y: -0.2, z: 0
                        }
                    }
                }
            ]
        }
    ]
};

var findPhoto = function(name){
    var photo = {};
    $.each(database.photos, function(i, e){
        if (e.name === name) {
            photo = e;
            return false;
        }
    });

    return photo;
};
