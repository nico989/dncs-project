import time
import argparse

from comnetsemu.net import Containernet
from mininet.log import info, setLogLevel
from mininet.node import Controller
from mininet.link import TCLink

CPU_SETS = "0"


def broker():
    info("Add host brokermqtt\n")
    brokermqtt = net.addDockerHost(
        "brokermqtt",
        dimage="brokermqtt",
        ip="10.0.0.1",
        docker_args={},
    )

    info("Add link\n")
    net.addLink(switch, brokermqtt, bw=10, delay="10ms")


def valvole():
    info("Add host valvolacucina\n")
    v1 = net.addDockerHost(
        "v1",
        dimage="valvola",
        ip="10.0.0.2",
        docker_args={"environment": ["NAME=cucina"]},
    )

    info("Add link\n")
    net.addLink(switch, v1, bw=10, delay="10ms")

    info("Add host valvolacamera\n")
    v2 = net.addDockerHost(
        "v2",
        dimage="valvola",
        ip="10.0.0.3",
        docker_args={"environment": ["NAME=camera"]},
    )

    info("Add link\n")
    net.addLink(switch, v2, bw=10, delay="10ms")

    info("Add host valvolabagno\n")
    v3 = net.addDockerHost(
        "v3",
        dimage="valvola",
        ip="10.0.0.4",
        docker_args={"environment": ["NAME=bagno"]},
    )

    info("Add link\n")
    net.addLink(switch, v3, bw=10, delay="10ms")


def umidificatori():
    info("Add host umidificatorecucina\n")
    u1 = net.addDockerHost(
        "u1",
        dimage="umidificatore",
        ip="10.0.0.5",
        docker_args={"environment": ["NAME=cucina"]},
    )

    info("Add link\n")
    net.addLink(switch, u1, bw=10, delay="10ms")

    info("Add host umidificatorecamera\n")
    u2 = net.addDockerHost(
        "u2",
        dimage="umidificatore",
        ip="10.0.0.6",
        docker_args={"environment": ["NAME=camera"]},
    )

    info("Add link\n")
    net.addLink(switch, u2, bw=10, delay="10ms")

    info("Add host umidificatorebagno\n")
    u3 = net.addDockerHost(
        "u3",
        dimage="umidificatore",
        ip="10.0.0.7",
        docker_args={"environment": ["NAME=bagno"]},
    )

    info("Add link\n")
    net.addLink(switch, u3, bw=10, delay="10ms")


def split():
    info("Add host splitcucina\n")
    s1 = net.addDockerHost(
        "s1",
        dimage="split",
        ip="10.0.0.8",
        docker_args={"environment": ["NAME=cucina"]},
    )

    info("Add link\n")
    net.addLink(switch, s1, bw=10, delay="10ms")

    info("Add host splitcamera\n")
    s2 = net.addDockerHost(
        "s2",
        dimage="split",
        ip="10.0.0.9",
        docker_args={"environment": ["NAME=camera"]},
    )

    info("Add link\n")
    net.addLink(switch, s2, bw=10, delay="10ms")

    info("Add host splitbagno\n")
    s3 = net.addDockerHost(
        "s3",
        dimage="split",
        ip="10.0.0.10",
        docker_args={"environment": ["NAME=bagno"]},
    )

    info("Add link\n")
    net.addLink(switch, s3, bw=10, delay="10ms")


def luci():
    info("Add host lucecucina\n")
    l1 = net.addDockerHost(
        "l1",
        dimage="luce",
        ip="10.0.0.11",
        docker_args={"environment": ["NAME=cucina"]},
    )

    info("Add link\n")
    net.addLink(switch, l1, bw=10, delay="10ms")

    info("Add host lucecamera\n")
    l2 = net.addDockerHost(
        "l2",
        dimage="luce",
        ip="10.0.0.12",
        docker_args={"environment": ["NAME=camera"]},
    )

    info("Add link\n")
    net.addLink(switch, l2, bw=10, delay="10ms")

    info("Add host lucebagno\n")
    l3 = net.addDockerHost(
        "l3",
        dimage="luce",
        ip="10.0.0.13",
        docker_args={"environment": ["NAME=bagno"]},
    )

    info("Add link\n")
    net.addLink(switch, l3, bw=10, delay="10ms")


def tapparelle():
    info("Add host tapparellacucina\n")
    t1 = net.addDockerHost(
        "t1",
        dimage="tapparella",
        ip="10.0.0.14",
        docker_args={"environment": ["NAME=cucina"]},
    )

    info("Add link\n")
    net.addLink(switch, t1, bw=10, delay="10ms")

    info("Add host tapparellacamera\n")
    t2 = net.addDockerHost(
        "t2",
        dimage="tapparella",
        ip="10.0.0.15",
        docker_args={"environment": ["NAME=camera"]},
    )

    info("Add link\n")
    net.addLink(switch, t2, bw=10, delay="10ms")

    info("Add host tapparellabagno\n")
    t3 = net.addDockerHost(
        "t3",
        dimage="tapparella",
        ip="10.0.0.16",
        docker_args={"environment": ["NAME=bagno"]},
    )

    info("Add link\n")
    net.addLink(switch, t3, bw=10, delay="10ms")


def sonde():
    info("Add host sondacucina\n")
    so = net.addDockerHost(
        "so1",
        dimage="sonda",
        ip="10.0.0.17",
        docker_args={},
    )

    info("Add link\n")
    net.addLink(switch, so, bw=10, delay="10ms")

    info("Add host sondacamera\n")
    so = net.addDockerHost(
        "so2",
        dimage="sonda",
        ip="10.0.0.18",
        docker_args={},
    )

    info("Add link\n")
    net.addLink(switch, so, bw=10, delay="10ms")

    info("Add host sondabagno\n")
    so = net.addDockerHost(
        "so3",
        dimage="sonda",
        ip="10.0.0.19",
        docker_args={},
    )

    info("Add link\n")
    net.addLink(switch, so, bw=10, delay="10ms")


def pulsantiera():
    info("Add host pulsantiera\n")
    p1 = net.addDockerHost(
        "p1",
        dimage="pulsantiera",
        ip="10.0.0.20",
        docker_args={},
    )

    info("Add link\n")
    net.addLink(switch, p1, bw=10, delay="10ms")


def applicazione():
    info("Add host applicazione\n")
    a1 = net.addDockerHost(
        "a1",
        dimage="applicazione",
        ip="10.0.0.21",
        docker_args={},
    )

    info("Add link\n")
    net.addLink(switch, a1, bw=10, delay="10ms")


if __name__ == "__main__":
    setLogLevel("info")
    timeout = input("Insert time to live in min:")

    net = Containernet(controller=Controller, link=TCLink)

    info("Add controller c0\n")
    net.addController("c0")

    info("Add switch s1\n")
    switch = net.addSwitch("s1")

    broker()

    valvole()

    umidificatori()

    split()

    luci()

    tapparelle()

    sonde()

    pulsantiera()

    applicazione()

    info("Start\n")
    net.start()

    time.sleep(timeout * 60)

    info("Stop\n")
    net.stop()
